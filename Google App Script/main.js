var rooms_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("rooms")
var info_rooms = rooms_sheet.getDataRange().getValues()

function check_if_open(info_rooms, info, hour_start, hour_end)
{
  var index_room = -1
  for (var i = 0; index_room == -1; i++)
    if (rooms[i] == info.room)
      index_room = i + 1
  var i = info_rooms[index_room]
    var temp_i = info_rooms[index_room][1].toString().split(":")
  var temp_j = info_rooms[index_room][2].toString().split(":", 2)
  if (hour_start[0] < temp_i[0] || hour_end[0] > temp_j[0])
    return (false)
  else if (hour_start[0] == temp_i[0])
          if (hour_start[1] < temp_i[1])
            return (false)
        else
          if (hour_end[0] == temp_j[0])
            if (hour_end[1] == temp_j[1])
              return (false)
  return (true)
}

function generate_data(info)
{

  var date = info.date.toString().split("/", 3)
  var start = info.start
  var end = info.end
        var hour_start = start.split(":",2);
        var hour_end = end.split(":", 2);
        if (!check_if_open(info_rooms, info, hour_start, hour_end))
          return (null)
        var start = new Date(date[2], date[1] - 1, date[0], hour_start[0], hour_start[1]);
        var end = new Date(date[2], date[1] - 1, date[0], hour_end[0], hour_end[1]);

  var data = {
    "name": info.name,
    "start": start,
    "end": end,
    "members": info.members,
    "room": info.room,
    "email": info.email
  }
  return (data)
}

function agendar(content)
{
  var data = generate_data(content)
  
  if (data == null)
    return ("Room closed")
  if (parseFloat(data.room) == 0)
  {
    var room = check_better_room(data, info_rooms)
    if (room == false)
      return ("Capacity")
    else
    {
      data.room = room
      create_event(data)
    } 
  }
  else
  {
    if (check_availability(data))
      create_event(data);
    else
      return ("schedule problem")
  }
  return ("all good")
}

function doPost(e)
{
  //receber a resposta do forms na pagina html
  var content = JSON.parse(e.postData.contents);
  var ret;
  //main_sheet.getRange("A1:B1").setValue(content)
  if (content.option == "Book")
    ret = agendar(content);
  else
    ret = deleteEvent(content.id)
    let input = JSON.stringify({ "message": ret})
    //var template = HtmlService.createHtmlOutput()
    //return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return ContentService.createTextOutput(input).setMimeType(ContentService.MimeType.JSON); 
};
