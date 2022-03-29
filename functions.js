var rooms_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("rooms")
var rooms = rooms_sheet.getRange("A2:A").getValues()

//função que faz o check se há disponibilidade daquele dia
//A function to check if the room chosen by the user is avaible
function check_availability(data)
{
  var start = new Date (data.start)
  var end = new Date (data.end)
  var calendar = CalendarApp.getOwnedCalendarsByName("Room ".concat(data.room))[0]
  if (calendar == null) //se o calendário não existir
    return (false)  
  //se a lotação ta correta
  var i = 0
  while(true)
  {
    if (parseFloat(info_rooms[i][0]) == parseFloat(data.room))
      if(info_rooms[i][3] < data.members)
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
function send_email(data, event_id)
{
  var event_id = "This will be an ID"
  var templ = HtmlService
      .createTemplateFromFile('email');

  templ.fill_email = data
  templ.event_id = event_id
  var message = templ.evaluate().getContent();

  GmailApp.sendEmail(data.email, 'You have a booking for you meeting', '', {
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
function create_event(data)
{
  var start = new Date (data.start)
  var end = new Date (data.end)
  
  var color = find_room_index(rooms, data.room)
  var calendar_id = CalendarApp.getOwnedCalendarsByName("Room ".concat(data.room))[0].getId()
    var event = CalendarApp.getCalendarById(calendar_id).createEvent("Meeting Host: " + data.name,
    start,
    end,
    {guests: data.email});
  event.setColor(color)
  send_email(data, event.getId())
}


function sort()
{
  rooms_sheet.getRange("A2:D").sort(4)
}

//retorna a melhor sala para fazer o apontamento
function check_better_room(data, info_rooms)
{
  sort()
  var start = new Date (data.start)
  var end = new Date (data.end)
  var avaible_rooms = [] 
  
  var i = 0
  while (true)
  {
    i += 1
    var calendar = CalendarApp.getOwnedCalendarsByName("Room ".concat(info_rooms[i][0]))[0]
    if (calendar == null)
      continue //se o calendário não existir
    var events = CalendarApp.getOwnedCalendarById(calendar.getId()).getEvents(start, end)
    if (events.length == 0)
      avaible_rooms.push(i)
    if (rooms[i] == "") 
      break;
  }
  i = 0
  while (true)
  {
    var index = parseFloat(avaible_rooms[i])

    if (info_rooms[index][3] >= parseFloat(data.room))
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