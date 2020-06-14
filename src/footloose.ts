import * as process from 'process'
import {downloadAndReturnPath} from '../src/download-util-v0'
import * as io from '@actions/io'
import fs from 'fs'


export async function footlooseSetup(): Promise<string> {
  const url = 'https://github.com/weaveworks/footloose/releases/download/0.6.3/footloose-0.6.3-linux-x86_64'
  process.env.RUNNER_TEMP = '/tmp'

  const downloadPath = await downloadAndReturnPath(url)
  if (!downloadPath) {
    throw new Error(`Failed to download release, url: ${url}`)
  }

  await io.mv(downloadPath, '/tmp/footloose')
  fs.chmodSync('/tmp/footloose', '0755')

  const url2 = 'https://git.io/JfH6A'
  const footYaml = await downloadAndReturnPath(url2)
  if (!footYaml) {
    throw new Error(`Failed to download release, url: ${url}`)
  }

  await io.mv(footYaml, '/tmp/footloose.yaml')

  return process.env.RUNNER_TEMP
}


