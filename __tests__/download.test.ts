import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {downloadAndReturnPath} from '../src/download-util-v0'
import {retry} from '@lifeomic/attempt'
import * as toolCache from '@actions/tool-cache'



test('download', async () => {
  const url = 'https://github.com/weaveworks/footloose/releases/download/0.6.3/footloose-0.6.3-linux-x86_64'
  process.env.RUNNER_TEMP = '/tmp';

  const downloadPath = await downloadAndReturnPath(url)
  if (!downloadPath) {
     throw new Error(`Failed to download release, url: ${url}`);
  }
  //await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  var delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
