import { Service } from '@angular/core';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { environment } from '@src/environments/environment';
import { API } from '@src/app/api/api';

@Service()
export class Reverb {
  private echo!: Echo<'reverb'>;

  public connect(userId: number, token: string, onUserDeleted: () => void) {
    this.echo = new Echo({
      broadcaster: 'reverb',
      key: environment.reverb.key,

      client: new Pusher(environment.reverb.key, {
        cluster: 'mt1',
        wsHost: environment.reverb.host,
        wsPort: environment.reverb.port,
        wssPort: environment.reverb.port,
        wsPath:'/ws',
        forceTLS: false,
        enabledTransports: ['ws'],
        channelAuthorization: {
          endpoint: API.BROADCASTING.AUTH,
          transport: 'ajax',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    });

    this.echo
    .private(`deleted-user.${userId}`)
    .listen('.user.deleted', (event: { userId: number }) => {
      if (event.userId === userId) {
        onUserDeleted();
      }
    });
  }

  public getInstance(): Echo<'reverb'> {
    return this.echo;
  }

  public disconnect(): void {
    this.echo.disconnect();
  }
}
