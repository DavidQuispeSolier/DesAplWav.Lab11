import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2'

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  },
  title: string,
  info: string
};


@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit{
  
  listTiendas: Tienda[] = [];
  elementos: number = 0;

  constructor(private _tiendaService: TiendaService) {

  }

  ngOnInit(): void {
    
    this.obtenerTiendas();

  }

  obtenerTiendas(){
    this._tiendaService.getTiendas().subscribe(data => {
      console.log(data);
      this.listTiendas = data;
      this.elementos = this.listTiendas.length;
    })
  }

  eliminarTienda(id: any){
      Swal.fire({
        title: 'Eliminacion de Tienda',
        text: "¿Desea eliminar la tienda?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._tiendaService.deleteTienda(id).subscribe(data => {
          console.log(data);
          this.obtenerTiendas();
          this.elementos = this.listTiendas.length;
        });
      }
    });
  }


  mapOptions: google.maps.MapOptions = {
    
    center: { lat: -12.076527, lng: -77.009987 },
    zoom: 13,
    mapTypeControl: false
  };

  markers: MarkerProperties[] = [
    { position: { lat: -12.056656, lng: -76.972479 }, 
      label: { color: 'black', text: 'Tienda N°1', fontSize: '20px', fontWeight: 'bold' },
      title: 'ciudad',
      info: 'ciudad de los reyes'
       }, // Tecsup
    
    { position: { lat: -12.078761, lng: -77.081864 }, 
      label: { color: 'black', text: 'Tienda N°2', fontSize: '20px', fontWeight: 'bold'  },
      title: 'ciudad',
      info: 'ciudad de los reyes'
       }, // Tecsup }, 
       
    { position: { lat: -12.088324, lng: -77.051107 }, 
      label: { color: 'black', text: 'Tienda N°3', fontSize: '20px', fontWeight: 'bold'  },
      title: 'ciudad',
      info: 'ciudad de los reyes'
       }, // Tecsup }, 
  ];

  map!: google.maps.Map;

  handleMapInitialized(map: google.maps.Map) {
    this.map = map;
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        label: marker.label,
        map: this.map})
    });
  }

  verTiendas( distrito: string){

    if(distrito == 'Santa Anita'){
      this.verSantaAnita();
    }
    if(distrito == 'San Miguel'){
      this.verSanMiguel();
    }
    if(distrito == 'San Isidro'){
      this.verSanIsidro();
    }

  }
  
  verSantaAnita(){
    const santaAnitaLatLng = new google.maps.LatLng(-12.056656, -76.972479);
    this.map.setCenter(santaAnitaLatLng);
    this.map.setZoom(17);
  }

  verSanMiguel(){
    const sanMiguelLatLng = new google.maps.LatLng(-12.078761, -77.081864);
    this.map.setCenter(sanMiguelLatLng);
    this.map.setZoom(17);
  }

  verSanIsidro(){
    const sanIsidroLatLng = new google.maps.LatLng(-12.088324, -77.051107);
    this.map.setCenter(sanIsidroLatLng);
    this.map.setZoom(17);
  }

}
