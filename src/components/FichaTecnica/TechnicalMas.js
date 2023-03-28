import React from "react";

const TechnicalMas = (mas) => {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JS empiezan en 0
  const anio = fechaActual.getFullYear();

  //calcular la función de distribución acumulativa normal estándar inversa
  //Esta funcion deberiamos pasar a un contexto global para que pueda ser usada por otros componentes
  function NormSInv(p) {
    var a1 = -39.6968302866538,
      a2 = 220.946098424521,
      a3 = -275.928510446969;
    var a4 = 138.357751867269,
      a5 = -30.6647980661472,
      a6 = 2.50662827745924;
    var b1 = -54.4760987982241,
      b2 = 161.585836858041,
      b3 = -155.698979859887;
    var b4 = 66.8013118877197,
      b5 = -13.2806815528857,
      c1 = -7.78489400243029e-3;
    var c2 = -0.322396458041136,
      c3 = -2.40075827716184,
      c4 = -2.54973253934373;
    var c5 = 4.37466414146497,
      c6 = 2.93816398269878,
      d1 = 7.78469570904146e-3;
    var d2 = 0.32246712907004,
      d3 = 2.445134137143,
      d4 = 3.75440866190742;
    var p_low = 0.02425,
      p_high = 1 - p_low;
    var q, r;
    var retVal;

    if (p < 0 || p > 1) {
      alert("NormSInv: Argument out of range.");
      retVal = 0;
    } else if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p));
      retVal =
        (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
      q = p - 0.5;
      r = q * q;
      retVal =
        ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
        (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      retVal =
        -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
  }

  //Variables estadísticas
  let N = mas.TamanoPoblacion;
  let P = mas.ProbabilidadDeExito / 100;
  let Q = mas.ProbabilidadDeFallo / 100;
  let e = mas.ErrorDeEstimacion / 100;

  //Hallamos Z
  let z = mas.NivelDeConfianza / 100; //Pasamos a decimal
  let alfa = 1 - z; //Nivel de significancia
  let Z = NormSInv(z * (alfa / 2)) * -1; //Hallamos Z

  //Hallamos n Tamaño de la muestra
  let n = Math.ceil((N * Z ** 2 * P * Q) / ((N - 1) * e ** 2 + Z ** 2 * P * Q)); //Tamaño de la muestra

  return (
    <div>
      <h2>Technical Mas</h2>
      <p>Fecha: {`${dia}/${mes}/${anio}`}</p>
      <p>Diseño Muestral: Muestra Aleatoria Simple</p>
      <p>
        Nombre: {mas.nombre} {mas.apellido}{" "}
      </p>
      <p>Tamaño de la Población: {N}</p>
      <p>Nivel de Confianza: {mas.NivelDeConfianza}</p>
      <p>Probabilidad de Éxito: {mas.ProbabilidadDeExito}</p>
      <p>Probabilidad de Fallo: {mas.ProbabilidadDeFallo}</p>
      <p>Error de Estimación: {mas.ErrorDeEstimacion}</p>
      <p>Tamaño de la Muestra: {n}</p>
    </div>
  );
};

export default TechnicalMas;