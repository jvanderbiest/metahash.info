import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalPopupService } from '../../modal-popup.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPopupComponent implements OnInit {
  @Input() id!: string;
  private element: any;

    constructor(private modalPopupService: ModalPopupService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el : any) => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalPopupService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalPopupService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('app-modal-popup');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('app-modal-popup');
    }

}