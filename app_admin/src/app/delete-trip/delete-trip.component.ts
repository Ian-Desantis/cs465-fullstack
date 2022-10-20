import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";


@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {
    editForm: FormGroup;
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

    ngOnInit() {
        // retrieve stashed tripId
        let tripCode = localStorage.getItem("tripCode");
        if (!tripCode) {
        alert("Something wrong, couldn't find where I stashed tripCode!");
        this.router.navigate([""]);
        return;
        }
        console.log("DeleteTripComponent#onInit found tripCode " + tripCode);
        //initialize form
        this.editForm = this.formBuilder.group({
        _id: [],
        code: [tripCode, Validators.required]
        });
        console.log(
        "DeleteTripComponent#onInit calling TripDataService#getTrip('" +
            tripCode +
            "')"
        );

        this.tripService.getTrip(tripCode).then((data) => {
        //console.log(data);
        // Don't use editForm.setValue() as it will throw console error
        this.editForm.patchValue(data[0]);
        });
        
    }
    onSubmit() {
        this.submitted = true;
          this.tripService.deleteTrip(this.editForm.value).then((data) => {
            console.log({message: "Trip Delete submitted"});
            this.router.navigate([""]);
          });
      }
      // get the form short name to access the form fields
      get f() {
        return this.editForm.controls;
      }
}
