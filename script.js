$(document).ready(function () {
  getData();
  $('.button').click(function () {
    getNewData();
  });
  $('.input').keyup(function () {
    if (event.keyCode == 13 || event.which == 13) {
      getNewData();
    }
  })
  $(document).on('click', '.fa-times', function () {
    var buttonDelete = $(this);
    var thisId = buttonDelete.parents('li').attr('data-id');
    deleteData(thisId);
  })
  $(document).on('click', '.fa-exchange-alt', function () {
    var buttonChange = $(this);
    var thisId = buttonChange.parents('li').attr('data-id');
    buttonChange.parents('li').find('.change').removeClass('none');
  });
  $(document).on('click', '.close', function () {
    var buttonClose = $(this);
    var thisId = buttonClose.parents('li').attr('data-id');
    buttonClose.parents('li').find('.change').addClass('none');
  });
  $(document).on('click', '.button-change', function () {
    var buttonConfirm = $(this);
    var thisId = buttonConfirm.parents('li').attr('data-id');
    var newText = $('.input-change').val();
    console.log(newText);
    changeData(thisId, newText);
  })
})

function getData() {
  $.ajax({
    url: 'http://157.230.17.132:3012/todos',
    method: 'GET',
    success: function (data) {
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < data.length; i++) {
        var context = {nome: data[i].text, id: data[i].id};
        var html = template(context);
        $('.lista ol').append(html)
      }
    },
    error: function () {
      console.log('errore');
    }
  })
}

function getNewData() {
  var text = $('.input').val();
  $.ajax({
    url: 'http://157.230.17.132:3012/todos',
    method: 'POST',
    data: {
      text: text,
    },
    success: function (data) {
      $('.lista ol').html('');
      getData();
      $('.input').val('');
    },
    errore: function () {
      console.log('errore');
    },
  })
}
function deleteData(id) {
  $.ajax({
    url: 'http://157.230.17.132:3012/todos/'+id,
    method: 'DELETE',
    success: function (data) {
      $('.lista ol').html('');
      getData();
    },
    error: function () {
      console.log('errore');
    }
  })
}
function changeData(id, val) {
  $.ajax({
    url: 'http://157.230.17.132:3012/todos/'+id,
    method: 'PUT',
    data:{
      text: val,
    },
    success: function (data) {
      $('.lista ol').html('');
      getData();
      $('.input').val('');
    },
    error: function () {
      console.log('errore');
    },
  })
}
