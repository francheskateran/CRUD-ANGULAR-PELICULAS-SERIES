import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pelicula {
  titulo: string;
  genero: string;
  anio: number;
  duracion: number;
  vista: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  titulo = '';
  genero = '';
  anio: number | null = null;
  duracion: number | null = null;

  indiceEditar: number | null = null;

  peliculas: Pelicula[] = [];

  constructor() {
    this.cargar();
  }

  cargar() {
    const datos = localStorage.getItem('peliculas');

    if (datos) {
      this.peliculas = JSON.parse(datos);
    }
  }

  guardar() {
    localStorage.setItem(
      'peliculas',
      JSON.stringify(this.peliculas)
    );
  }

  agregar() {

    if (
      this.titulo.trim() == '' ||
      this.genero.trim() == '' ||
      this.anio == null ||
      this.duracion == null
    ) {
      return;
    }

    if (this.indiceEditar !== null) {

      this.peliculas[this.indiceEditar] = {

        titulo: this.titulo,
        genero: this.genero,
        anio: this.anio,
        duracion: this.duracion,
        vista: this.peliculas[this.indiceEditar].vista

      };

      this.indiceEditar = null;

    } else {

      this.peliculas.push({

        titulo: this.titulo,
        genero: this.genero,
        anio: this.anio,
        duracion: this.duracion,
        vista: false

      });

    }

    this.limpiar();

    this.guardar();

  }

  editar(i: number) {

    this.indiceEditar = i;

    this.titulo = this.peliculas[i].titulo;
    this.genero = this.peliculas[i].genero;
    this.anio = this.peliculas[i].anio;
    this.duracion = this.peliculas[i].duracion;

  }

  eliminar(i: number) {

    this.peliculas.splice(i, 1);

    this.guardar();

  }

  cambiarEstado(i: number) {

    this.peliculas[i].vista = !this.peliculas[i].vista;

    this.guardar();

  }

  limpiar() {

    this.titulo = '';
    this.genero = '';
    this.anio = null;
    this.duracion = null;

  }

}