import { Component, OnInit, ViewChild } from '@angular/core';
import { ActorService } from '../actor.service';
import { Actor } from '../actor.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
	selector: 'app-actor-list',
	templateUrl: './actor-list.component.html',
	styleUrls: ['./actor-list.component.css']
})


export class ActorListComponent implements OnInit {
	actors$: Actor[];
	dataSource: MatTableDataSource<Actor>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	columnsToDisplay = ['actorId', 'firstName', 'lastName'];

	constructor(private actorService: ActorService) { }

	ngOnInit(): void {

		this.actorService.getActors().subscribe(data => {
			// wait 300ms after each keystroke before considering the term
			this.actors$ = data;
			this.dataSource = new MatTableDataSource<Actor>(this.actors$);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}
		);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}
