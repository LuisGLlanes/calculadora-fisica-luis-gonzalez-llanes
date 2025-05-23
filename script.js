const secciones = {
  velocidad: {
    titulo: "Velocidad (v = d / t)",
    campos: [
      { id: "distancia", label: "Distancia (m)" },
      { id: "tiempo", label: "Tiempo (s)" }
    ],
    formula: () => {
      let d = parseFloat(document.getElementById("distancia").value);
      let t = parseFloat(document.getElementById("tiempo").value);

      if (isNaN(d) || isNaN(t)) return "Faltan datos";
      if (t === 0) return "No se puede dividir entre cero";

      return `Velocidad = ${(d / t).toFixed(2)} m/s`;
    }
  },
  aceleracion: {
    titulo: "Aceleración (a = dv / dt)",
    campos: [
      { id: "deltaVelocidad", label: "Cambio de velocidad (m/s)" },
      { id: "deltaTiempo", label: "Tiempo (s)" }
    ],
    formula: () => {
      let dv = parseFloat(document.getElementById("deltaVelocidad").value);
      let dt = parseFloat(document.getElementById("deltaTiempo").value);

      if (isNaN(dv) || isNaN(dt)) return "Faltan datos";
      if (dt === 0) return "No se puede dividir entre cero";

      return `Aceleración = ${(dv / dt).toFixed(2)} m/s²`;
    }
  },
  fuerza: {
    titulo: "Fuerza (F = m · a)",
    campos: [
      { id: "masa", label: "Masa (kg)" },
      { id: "aceleracion", label: "Aceleración (m/s²)" }
    ],
    formula: () => {
      let m = parseFloat(document.getElementById("masa").value);
      let a = parseFloat(document.getElementById("aceleracion").value);

      if (isNaN(m) || isNaN(a)) return "Faltan datos";

      return `Fuerza = ${(m * a).toFixed(2)} N`;
    }
  },
  trabajo: {
    titulo: "Trabajo (W = F · d · cos(t))",
    campos: [
      { id: "fuerza", label: "Fuerza (N)" },
      { id: "distanciaT", label: "Distancia (m)" },
      { id: "angulo", label: "Ángulo (grados)" }
    ],
    formula: () => {
      let f = parseFloat(document.getElementById("fuerza").value);
      let d = parseFloat(document.getElementById("distanciaT").value);
      let ang = parseFloat(document.getElementById("angulo").value);

      if (isNaN(f) || isNaN(d) || isNaN(ang)) return "Faltan datos";

      const rad = ang * Math.PI / 180;
      return `Trabajo = ${(f * d * Math.cos(rad)).toFixed(2)} J`;
    }
  },
  energiaCinetica: {
    titulo: "Energía Cinética (K = ½ · m · v^2)",
    campos: [
      { id: "masaK", label: "Masa (kg)" },
      { id: "velocidadK", label: "Velocidad (m/s)" }
    ],
    formula: () => {
      let m = parseFloat(document.getElementById("masaK").value);
      let v = parseFloat(document.getElementById("velocidadK").value);

      if (isNaN(m) || isNaN(v)) return "Faltan datos";

      return `Energía Cinética = ${(0.5 * m * v * v).toFixed(2)} J`;
    }
  },
  energiaPotencial: {
    titulo: "Energía Potencial Gravitatoria (U = m · g · h)",
    campos: [
      { id: "masaU", label: "Masa (kg)" },
      { id: "altura", label: "Altura (m)" }
    ],
    formula: () => {
      let m = parseFloat(document.getElementById("masaU").value);
      let h = parseFloat(document.getElementById("altura").value);

      if (isNaN(m) || isNaN(h)) return "Faltan datos";

      return `Energía Potencial = ${(m * 9.8 * h).toFixed(2)} J`;
    }
  },
  densidad: {
    titulo: "Densidad (ρ = m / V)",
    campos: [
      { id: "masaD", label: "Masa (kg)" },
      { id: "volumen", label: "Volumen (m³)" }
    ],
    formula: () => {
      let m = parseFloat(document.getElementById("masaD").value);
      let v = parseFloat(document.getElementById("volumen").value);

      if (isNaN(m) || isNaN(v)) return "Faltan datos";
      if (v === 0) return "No se puede dividir entre cero";

      return `Densidad = ${(m / v).toFixed(2)} kg/m³`;
    }
  },
  presion: {
    titulo: "Presión (P = F / A)",
    campos: [
      { id: "fuerzaP", label: "Fuerza (N)" },
      { id: "area", label: "Área (m²)" }
    ],
    formula: () => {
      let f = parseFloat(document.getElementById("fuerzaP").value);
      let a = parseFloat(document.getElementById("area").value);

      if (isNaN(f) || isNaN(a)) return "Faltan datos";
      if (a === 0) return "No se puede dividir entre cero";

      return `Presión = ${(f / a).toFixed(2)} Pa`;
    }
  },
  carga: {
    titulo: "Carga Eléctrica (q = I · t)",
    campos: [
      { id: "corriente", label: "Corriente (A)" },
      { id: "tiempoC", label: "Tiempo (s)" }
    ],
    formula: () => {
      let i = parseFloat(document.getElementById("corriente").value);
      let t = parseFloat(document.getElementById("tiempoC").value);

      if (isNaN(i) || isNaN(t)) return "Faltan datos";

      return `Carga = ${(i * t).toFixed(2)} C`;
    }
  },
  ohm: {
    titulo: "Ley de Ohm (V = I · R)",
    campos: [
      { id: "corrienteO", label: "Corriente (A)" },
      { id: "resistencia", label: "Resistencia (Ω)" }
    ],
    formula: () => {
      let i = parseFloat(document.getElementById("corrienteO").value);
      let r = parseFloat(document.getElementById("resistencia").value);

      if (isNaN(i) || isNaN(r)) return "Faltan datos";

      return `Voltaje = ${(i * r).toFixed(2)} V`;
    }
  }
};

document.getElementById("seccionSelector").addEventListener("change", function () {
  const selected = this.value;
  const container = document.getElementById("formularioContainer");
  container.innerHTML = "";

  if (!selected || !secciones[selected]) return;

  const sec = secciones[selected];

  const formSection = document.createElement("div");
  formSection.className = "form-section"; // Clase usada en CSS

  const title = document.createElement("h2");
  title.textContent = sec.titulo;
  formSection.appendChild(title);

  sec.campos.forEach((campo) => {
    const group = document.createElement("div");
    group.className = "input-group";

    const label = document.createElement("label");
    label.setAttribute("for", campo.id);
    label.textContent = campo.label;

    const input = document.createElement("input");
    input.type = "number";
    input.id = campo.id;
    input.placeholder = campo.label;

    group.appendChild(label);
    group.appendChild(input);
    formSection.appendChild(group);
  });

  const button = document.createElement("button");
  button.textContent = "Calcular";
  button.onclick = () => {
    const resultado = sec.formula();
    resultDiv.textContent = resultado;
  };

  const resultDiv = document.createElement("div");
  resultDiv.id = "resultado";

  formSection.appendChild(button);
  formSection.appendChild(resultDiv);

  container.appendChild(formSection);

  // Activar animación simple
  void formSection.offsetWidth; // Reinicia la transición
  formSection.classList.add("show");
});
