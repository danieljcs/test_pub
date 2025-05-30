document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const x̄ = parseFloat(document.getElementById("media").value);
  const σ = parseFloat(document.getElementById("desviacion").value);
  const n = parseInt(document.getElementById("muestra").value);
  const confianza = parseInt(document.getElementById("confianza").value);
  const garantia = document.getElementById("garantia").value;

  if (isNaN(x̄) || isNaN(σ) || isNaN(n) || x̄ <= 0 || σ <= 0 || n <= 0) {
    alert("Por favor, introduce valores válidos y mayores a cero.");
    return;
  }

  let z;
  if (confianza === 90) z = 1.645;
  else if (confianza === 95) z = 1.96;
  else z = 2.576;

  const margen = z * (σ / Math.sqrt(n));
  const li = +(x̄ - margen).toFixed(2);
  const ls = +(x̄ + margen).toFixed(2);

  let conclusion = `Con un nivel de confianza del ${confianza}%, se estima que la media poblacional está entre ${li} y ${ls}.`;
  let sugerencia = garantia === "tiempo"
    ? `Sugerencia: Establecer garantía por tiempo cercana a ${li} horas.`
    : `Sugerencia: Establecer garantía por recorrido equivalente a ${li} km, según uso estimado.`;

  document.getElementById("resultadoTexto").innerHTML = `
    <p><strong>Intervalo de Confianza:</strong> [${li}, ${ls}]</p>
    <p>${conclusion}</p>
    <p><em>${sugerencia}</em></p>
  `;

  document.getElementById("resultadoModal").style.display = "block";

  const ctx = document.getElementById("grafica").getContext("2d");
  if (window.miGrafico) window.miGrafico.destroy();
  window.miGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Límite Inferior', 'Media', 'Límite Superior'],
      datasets: [{
        label: 'Valores',
        data: [li, x̄, ls],
        backgroundColor: ['#a8d5a0', '#f4e285', '#5e8b4a'],
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
});

// Cerrar modal con botón
document.querySelector(".cerrar").onclick = () => {
  document.getElementById("resultadoModal").style.display = "none";
};

// Cerrar modal haciendo clic fuera
window.onclick = function (event) {
  const modal = document.getElementById("resultadoModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Carrusel
let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");

function cambiarSlide(n) {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].classList.add("active");
}
