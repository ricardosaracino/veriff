import { AfterViewInit, Component } from '@angular/core';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';
// @ts-ignore
import { Veriff } from '@veriff/js-sdk';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  title = 'veriff';

  private veriff = Veriff({
    apiKey: 'a4d70332-287a-44e1-a0d4-683b52de2248',
    parentId: 'veriff-root',

    // @ts-ignore
    onSession: function (err, response) {

      // received the response, verification can be started / triggered now

      console.log(err, response);

      // incontext sdk
      createVeriffFrame({
        url: response.verification.url,
        onEvent: function (msg: MESSAGES) {
          console.log(msg);
        },
      });
    },
  });

  ngAfterViewInit(): void {

    this.veriff.setParams({
      person: {
        givenName: 'Ricardo',
        lastName: 'Saracino',
      },
      vendorData: JSON.stringify({ uuid: uuidv4(), clientId: 191, contactId: 49093 }),
    });

    this.veriff.mount({
      submitBtnText: 'Start Verification Process',
    });
  }
}
