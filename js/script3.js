  //pdf reader, the pdf.js is depreciated soon needs to be updated 
  const firstNameRegex = /([A-Z]{1}[a-z]+)/;
  const lastNameRegex = /([A-Z][a-z]+)/
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const phoneRegex = /(\d{3}-\d{3}-\d{4})/;

  const pdfUrl = '../Resume_AValitova.pdf';
  pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    pdf.getPage(1).then(page => {
      const canvas = document.getElementById('pdf-canvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1 });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  

  pdf.getPage(1).then(function(page) {
    return page.getTextContent();
  }).then(function(content) {
    let text = content.items.map(item => item.str).join('');
const firstNameMatch = text.match(firstNameRegex);
const firstName = firstNameMatch ? firstNameMatch[1] : null;

// Extract last name
const lastNameMatch = text.match(lastNameRegex);
const lastName = lastNameMatch ? lastNameMatch[1] : null;

// Extract email
const emailMatch = text.match(emailRegex);
const email = emailMatch ? emailMatch[1] : null;

// Extract phone number
const phoneMatch = text.match(phoneRegex);
const phone = phoneMatch ? phoneMatch[1] : null;

// Output the results
console.log("First Name:", firstName);
console.log("Last Name:", lastName);
console.log("Email:", email);
console.log("Phone:", phone);
    document.getElementById('resume').innerText = `${text}`;
  });
});


