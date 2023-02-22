// $(function () {
//   $('.input').on('input', function () { $('.text').text($('.input').val()); });
// });


var spans = document.getElementsByTagName("span");


for (var i = 0; i < spans.length; i++) {
  var span = spans[i];
  span.addEventListener("keyup", function(event){ 

    
    var thisSpan = event.target;

    if (thisSpan.textContent === "") {
      var placeholder = span.dataset.placeholder;
      thisSpan.innerHTML = placeholder
      console.log(placeholder);
      //alert("Hello World!");
    }
   
    
  span.addEventListener("keydown", textModified, true);
    function textModified() {
    span.classList.add("text-modified");
}
 
  });


  $('[contenteditable]').val('');









  // console.log(i);
   console.log(spans[i].textContent);
}





  // durchstreichen;
 // document.querySelector('#b1').addEventListener('click', (e) => {
 //   e.target.classList.toggle('strikethrough')
 //   })
  