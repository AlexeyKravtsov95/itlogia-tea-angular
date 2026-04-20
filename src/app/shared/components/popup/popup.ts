import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popup',
  imports: [RouterLink],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  @ViewChild('popup')
  popup!: TemplateRef<any>
  private popupRef!: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  open(): void {
    this.popupRef = this.modalService.open(this.popup);
  }

  close(): void {
    this.popupRef.close()
  }
}
