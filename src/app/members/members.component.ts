import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { Member } from "../models/member.model";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.css"],
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigate(["/addnew"]);
  }

  deleteByMemberID(id: number) {
    if (!id) return;
    this.appService.deleteMemberById(id).subscribe(() => {
      this.appService.getMembers().subscribe((members) => {
        console.log("members" + members);
        this.members = members;
      });
    });
  }
}
