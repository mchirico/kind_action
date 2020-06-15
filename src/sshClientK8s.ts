import * as process from 'process'
import * as io from '@actions/io'
import {execSync} from 'child_process'


export async function sshClientK8sSetup(): Promise<string> {

  process.env.GOPATH = '/tmp/gopath'
  await io.mkdirP('/tmp/gopath/src')
  await io.mkdirP('/tmp/gopath/bin')
  execSync('GO111MODULE=on go install github.com/mchirico/sshClientK8s')

  return process.env.GOPATH
}


