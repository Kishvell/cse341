const express = require("express");
const app = express();

// Permitir requests del frontend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/professional", (req, res) => {
  res.json({
    professionalName: "Santiago Irigoyen",

    // ⚠️ reemplazá esto por tu base64 real si querés tu imagen
    base64Image: "PEGÁ_BASE64_ACÁ",

    nameLink: {
      firstName: "Santiago",
      url: "https://github.com/Kishvell"
    },

    primaryDescription: "Estudiante de desarrollo web",

    workDescription1: "HTML, CSS, JavaScript",
    workDescription2: "Aprendiendo Node.js y backend",

    linkTitleText: "Mis redes:",

    linkedInLink: {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/santiago-benjam%C3%ADn-irigoyen-b2383523a/"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com/Kishvell"
    }
  });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});