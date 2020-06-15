import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {sshClientK8sSetup} from '../src/sshClientK8s'
import os from 'os'
import * as io from '@actions/io'
import {retry} from '@lifeomic/attempt'
import * as toolCache from '@actions/tool-cache'
import fs from 'fs'

test('sshClientK8sSetup', async () => {
  await sshClientK8sSetup()
  const r = fs.statSync('/tmp/.gopath/bin/sshClientK8s')

  await expect(r.size).toBeGreaterThan(929920)
})
