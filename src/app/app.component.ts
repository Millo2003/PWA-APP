import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculadora';
  operandoA: number = 0;
  operandoB: number = 0;
  resultado: number = 0;

  constructor(private http: HttpClient) {}

  onSumar() {
    this.resultado = this.operandoA + this.operandoB;
    this.guardarOperacion();
  }

  guardarOperacion() {
    this.http.post('http://localhost:3000/api/operaciones', {
      operandoA: this.operandoA,
      operandoB: this.operandoB,
      resultado: this.resultado,


    }).subscribe(
      () => console.log('Operación guardada correctamente'),
      error => console.error('Error al guardar la operación:', error)
    );
  }
}


