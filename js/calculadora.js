(function() {
    //Variables privadas
    
    //Funciones privadas
    function esLetra (valor) {
        var rxEsLetra = new RegExp("^([a-zA-Z]?)$");
        return rxEsLetra.test(valor);
    }
    function esNumero (valor) {
        var rxEsNumero = new RegExp("^(\\d+(\\.\\d+)?)$");
        return rxEsNumero.test(valor);
    }
    function esValido (valor) {
        return (esLetra(valor) || esNumero(valor));
    }
    function lpad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    function getQueryString(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    //Bindings
    document.addEventListener('DOMContentLoaded', function() {
        var minCuota = getQueryString("mc");
        var tasa = getQueryString("t");
        var maxCantCuotas = getQueryString("mcc");
        if(tasa !== "" && !isNaN(tasa = parseFloat(tasa)) && tasa > 0 && tasa < 1) {
            var _i = document.getElementById('i');
            console.log(_i);
            _i.setAttribute("disabled", "disabled");
            _i.value = tasa;
        }
        if(maxCantCuotas !== "" && !isNaN(maxCantCuotas = parseInt(maxCantCuotas, 10)) && maxCantCuotas > 0) {
            var _n = document.getElementById('n');
            _n.setAttribute("max", maxCantCuotas);
            _n.value = maxCantCuotas;
        }
        if(minCuota !== "" && !isNaN(minCuota = parseInt(minCuota, 10)) && minCuota > 0) {
            var _c = document.getElementById('c');
            _c.setAttribute("min", minCuota);
            _c.value = minCuota;
        }
        document.getElementById("calcular").addEventListener("click", function (event) {
            var c, d, n, i, rg3756;
            var info = document.getElementById("info");
            event.preventDefault();
            info.innerHTML = "";
            c = document.getElementById('c').value;
            d = document.getElementById('d').value;
            n = document.getElementById('n').value;
            i = document.getElementById('i').value;
            rg3756 = document.getElementById("rg3756").checked;
            console.log(rg3756);
            if(esValido(c) && esValido(d) && esValido(n) && esValido(i)) {
                var cantLetras = 0;
                if(esLetra(c)) {
                    cantLetras++;
                }
                if(esLetra(d)) {
                    cantLetras++;
                }
                if(esLetra(i)) {
                    cantLetras++;
                }
                if(esLetra(n)) {
                    cantLetras++;
                }
                if(cantLetras == 1) {
                    var log = document.getElementById('log');
                    var resultado = "";
                    if(esLetra(n)) {
                        c = parseFloat(c);
                        d = parseFloat(d);
                        i = parseFloat(i);
                        var aproximacion = -1;
                        var anterior = -1;
                        var cuotas = 0;
                        var cuotaInicial = 0;
                        resultado = resultado + "<table class='pure-table pure-table-horizontal pure-table-striped'><thead><tr>";
                        resultado = resultado + (!rg3756 ? "" : "<th>Cuota inicial (7%)</th>");
                        resultado = resultado + "<th>Cantidad de Cuotas</th><th>Valor de la cuota (aprox. en $)</th><th>Monto total del plan (aprox en $)</th></tr><tbody>";
                        for (var j = 1; j < 12*10; j = j + 1) { 
                            resultado = resultado + "<tr>";
                            var operacion = 0;
                            if(!rg3756) {
                                operacion = (d * i * Math.pow(1 + i, j) )  / ( Math.pow(1 + i, j) - 1 );
                            } else {
                                operacion = (d * i * 0.93 * Math.pow(1 + i, j) )  / ( Math.pow(1 + i, j - 1) - 1 );
                                cuotaInicial = d * 0.07 * (1 + i);
                            }
                                
                            if(operacion < c && aproximacion === -1) {
                                if(Math.abs(operacion - c) < Math.abs(anterior - c)) {
                                    aproximacion = operacion;
                                    cuotas = j;
                                }
                                else {
                                    aproximacion = anterior;
                                    cuotas = j - 1;
                                }
                            }
                            if(rg3756) {
                                resultado = resultado + "<td>" + cuotaInicial.toFixed(2) + "</td>";
                            } else {
                                cuotaInicial = aproximacion;
                            }
                            resultado = resultado + "<td>" + lpad(j, 3) +"</td><td class='cell-number'> " + operacion.toFixed(2) + "</td><td class='cell-number'>" + (operacion * (j - 1) + cuotaInicial).toFixed(2) + "</td></tr>";
                            anterior = operacion;
                        }
                        resultado = resultado + "</tbody></table>";
                        resultado = "<h2>Plan recomendado</h2><p><strong>Cuotas: " + cuotas + (!rg3756 ? "" : " - Valor de la cuota inicial: $ " + cuotaInicial.toFixed(2)) + " - Valor de la cuota: $ " + aproximacion.toFixed(2) + " - Monto Total del plan: $ " + ((cuotas - 1) * aproximacion + cuotaInicial).toFixed(2) + "</strong></p><p>Pasos de la aproximación:</p>" + resultado;
                    } else {
                        if(esLetra(c)) {
                            //Hay que averiguar la cuota;
                            n = parseFloat(n);
                            d = parseFloat(d);
                            i = parseFloat(i);
                            var operacion = 0;
                            if(!rg3756) {
                                operacion = (d * i * Math.pow(1 + i, n) )  / ( Math.pow(1 + i, n) - 1 );
                            } else {
                                operacion = (d * i * 0.93 * Math.pow(1 + i, n) )  / ( Math.pow(1 + i, n - 1) - 1 );
                                var cuotaInicial = d * 0.07 * (1 + i);
                            }
                            if(cuotaInicial) {
                                resultado = resultado + "<p><strong>La cuota inicial es $ " + cuotaInicial.toFixed(2) + "</strong></p>";
                            } else {
                                cuotaInicial = operacion;
                            }
                            resultado = resultado + "<p><strong>El valor de la cuota es $ " + operacion.toFixed(2) + "</strong></p>";
                            resultado = resultado + "<p><strong>Monto total del plan $ " + (cuotaInicial + (n - 1) * operacion).toFixed(2) + "</strong></p>";
                        }
                    }
                    log.innerHTML = resultado;
                } else {
                    if(cantLetras === 0) {
                        info.innerHTML = "<p class='error'>Debe dejarse al menos un valor vacío.<p>";
                    } else {
                        info.innerHTML = "<p class='error'>Solo un valor puede estar en vacío.<p>";
                    }
                }
            } else {
                info.innerHTML = "<p class='error'>Algunos de los parámetros no tiene un valor válido.<p>";
            }
        });
        document.getElementById("rg3756").addEventListener("change", function (event) {
            var txtInteres = document.getElementById("i");
            if(this.checked) {
                txtInteres.value = 0.019;
            } else {
                txtInteres.value = 0.0135;
            }
        });
    });
    
})();

