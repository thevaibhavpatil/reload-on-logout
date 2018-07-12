import { Joke } from './joke';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TransferState, makeStateKey } from '@angular/platform-browser';  //1
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const KEY_JOKES = makeStateKey('jokes')

@Injectable()
export class AppService {

    url = `https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke`

    constructor(
        private http: HttpClient,
        private state: TransferState
    ) {

    }

    jokes(cb: (jk: Array<Joke>) => void): Subscription | void {
        let jokes: Array<Joke> = this.state.get(KEY_JOKES, null as any)
        if (jokes) {
            cb(jokes)
            return
        }
        return this.http.get(this.url).subscribe(
            jk => {
                this.state.set(KEY_JOKES, jk as any)
                cb(jk as Array<Joke>)
            },
            err => { },
            () => { }
        )
    }
}