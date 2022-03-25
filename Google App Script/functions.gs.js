//var main_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("form")
var rooms_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("rooms")
var rooms = rooms_sheet.getRange("A2:A").getValues()

//função que faz o check se há disponibilidade daquele dia
function check_availability(data_array)
{
  var start = new Date (data_array[1])
  var end = new Date (data_array[2])
  Logger.log(start)
  Logger.log(end)
  var pessoas = data_array[3]
  var room = data_array[4]
  Logger.log("Room ".concat(room))
  var calendar = CalendarApp.getOwnedCalendarsByName("Room ".concat(room))[0]
  if (calendar == null) //se o calendário não existir
    return (false)  
  //se a lotação ta correta
  var i = 0
  while(true)
  {
    if (parseFloat(info_rooms[i][0]) == parseFloat(room))
      if(info_rooms[i][3] < pessoas)
        return (false)
    i ++; 
     if (rooms[i] == "") break;
  }
  //checar se tem eventos nesse horário
  var events = CalendarApp.getOwnedCalendarById(calendar.getId()).getEvents(start, end)
  if (events.length > 0)
    return (false)
  return (true)
}

//enviar email de confirmação
function send_email(data_array, event_id)
{
  var templ = HtmlService
      .createTemplateFromFile('email');
  var fill_email = {
      "name": data_array[0],
      "start": data_array[1],
      "end" : data_array[2],
      "event_id": event_id
  }

  templ.fill_email = fill_email
  var message = templ.evaluate().getContent();

  GmailApp.sendEmail(data_array[5].toString(), 'You have a booking for you meeting', '', {
    htmlBody: message,
    name: 'Room4all'
  });
}

function find_room_index(rooms, room)
{
  var i = 0
  while(true)
  {
    if (rooms[i] == room)
      break
    i ++; 
     if (rooms[i] == "") 
     {
       i = -1;
       break;
     }
  }
  return i
}

//funçao que recebe a sala e um vetor com as informações (host, date, start, end, pessoas)
//onde adicionar o número de pessoas?
function create_event(data_array)
{
  var name = data_array[0]
  var start = new Date (data_array[1])
  var end = new Date (data_array[2])
  var room = data_array[4]
  var email = data_array[5]
  
  var color = find_room_index(rooms, room)

  var calendar_id = CalendarApp.getOwnedCalendarsByName("Room ".concat(room))[0].getId()
    var event = CalendarApp.getCalendarById(calendar_id).createEvent("Meeting Host: " + name,
    start,
    end,
    {guests: email});
    event.setColor(color)
  send_email(data_array, event.getId())
  Logger.log(event.getId())
}


function sort()
{
  rooms_sheet.getRange("A2:D").sort(4)
}

//retorna a melhor sala para fazer o apontamento
function check_better_room(data_array, info_rooms)
{
  sort()
  var room = parseFloat(data_array[4])
  var start = new Date (data_array[1])
  var end = new Date (data_array[2])
  var avaible_rooms = [] 
  var i = 0

  while (true)
  {
    var calendar = CalendarApp.getOwnedCalendarsByName("Room ".concat(info_rooms[i][0]))[0]
    if (calendar == null)
    {
      i += 1
      continue 
    } //se o calendário não existir
    var events = CalendarApp.getOwnedCalendarById(calendar.getId()).getEvents(start, end)
    if (events.length == 0)
      avaible_rooms.push(i)
    i += 1
    if (rooms[i] == "") break;
  }
  i = 0
  while (true)
  {
    var index = parseFloat(avaible_rooms[i])

    if (info_rooms[index][3] >= room)
      return (avaible_rooms[i])
    i += 1
    if (i == avaible_rooms.length) break;
  }
  return (false)
}
//deleteEvent()

function deleteEvent(id)
{
  var calendars = CalendarApp.getAllOwnedCalendars();

  var i = 0
  while(calendars[i])
  {
    var event = calendars[i].getEventById(id)
    if (event)
    {
      event.deleteEvent();
      return ("Event Deleted")
    }
    i ++
  }
  return ("Event not found")
}