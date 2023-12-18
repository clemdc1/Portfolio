import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  messageForm = this.fb.group({
    from_first_name: new FormControl(''),
    from_last_name: new FormControl(''),
    from_email: new FormControl(''),
    message: new FormControl(''),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  public onSubmit(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_cokr3p4',
        'template_9cypdcl',
        e.target as HTMLFormElement,
        'wJD5jVTEdFvdYVmfw'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    this.messageForm.reset();
  }
}
