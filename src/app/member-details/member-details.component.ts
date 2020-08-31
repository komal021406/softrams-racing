import { Component, OnInit, OnChanges } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AppService } from "../app.service";
import { Router, ActivatedRoute } from "@angular/router";

import { Member } from "../models/member.model";

@Component({
  selector: "app-member-details",
  templateUrl: "./member-details.component.html",
  styleUrls: ["./member-details.component.css"],
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.memberForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      jobTitle: new FormControl("", Validators.required),
      team: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.getMemberById();
    this.appService.getTeams().subscribe((teams) => (this.teams = teams));
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit() {
    console.log(
      "hello: " + Object.assign({}, this.memberModel, this.memberForm.value)
    );
    this.memberModel = Object.assign(
      {},
      this.memberModel,
      this.memberForm.value
    );
    console.log("this.");

    if (this.memberModel.id) {
      console.log({ id: this.memberModel.id });
      console.log(this.memberModel);
      this.appService
        .updateMember(this.memberModel)
        .subscribe(() => this.router.navigate(["/members"]));
    } else {
      this.appService
        .addMember(this.memberModel)
        .subscribe(() => this.router.navigate(["/members"]));
    }
  }

  getMemberById(): void {
    let id = +this.route.snapshot.paramMap.get("id");
    console.log({ id: id });
    if (id != null && id != 0) {
      this.appService.getMember(id).subscribe((member) => {
        console.log({ member: member });
        this.memberModel = member;
        this.memberForm.patchValue(member);
      });
    }
  }
}
