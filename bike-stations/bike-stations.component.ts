import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {filter} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-bike-stations',
  templateUrl: './bike-stations.component.html',
  styleUrls: ['./bike-stations.component.css'],
})




export class BikeStationsComponent implements OnInit {
  bikeStations: Observable<any>
  bikeAvailability: Observable<any>
  ElementData = [];
  displayedColumns: string[] = ['name','station_id','bikes_available','physical_configuration','address'];


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  stationStatus: Observable<any>
  dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient) {

  }


  isSameByIds(array1, array2) {
   array1.map((x) => {
      array2.map((y) => { if(x['station_id'] == y['station_id']){
        this.ElementData.push({name:x['name'],
          station_id: y['station_id'],
          bikes_available: y['num_bikes_available'],
          physical_configuration: x['physical_configuration'],
          address: x['address'],
        });
      }})
    });
   this.dataSource = new MatTableDataSource(this.ElementData);
  }




  ngOnInit() {
    this.bikeStations = this.http.get(environment.apiUrl+'toronto-us.publicbikesystem.net/ube/gbfs/v1/en/station_information')
    this.bikeAvailability = this.http.get(environment.apiUrl+'toronto-us.publicbikesystem.net/ube/gbfs/v1/en/station_status')

    const source = forkJoin([this.bikeStations, this.bikeAvailability]);
    source.subscribe( resp => {
      this.isSameByIds(resp[0].data.stations,resp[1].data.stations);
      this.dataSource.sort = this.sort;
    })
 }

}

