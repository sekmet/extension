// Copyright 2019-2020 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { InjectedAccounts, InjectedAccount, Unsubcall } from '@polkadot/extension-inject/types';
import { SendRequest } from './types';

// External to class, this.# is not private enough (yet)
let sendRequest: SendRequest;

export default class Accounts implements InjectedAccounts {
  constructor (_sendRequest: SendRequest) {
    sendRequest = _sendRequest;
  }

  public get (): Promise<InjectedAccount[]> {
    return sendRequest('pub(accounts.list)');
  }

  public subscribe (cb: (accounts: InjectedAccount[]) => unknown): Unsubcall {
    sendRequest('pub(accounts.subscribe)', null, cb)
      .catch((error: Error) => console.error(error));

    return (): void => {
      // FIXME we need the ability to unsubscribe
    };
  }
}
