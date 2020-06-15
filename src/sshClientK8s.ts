import * as process from 'process'
import * as io from '@actions/io'
import {execSync} from 'child_process'

export async function sshClientK8sSetup(): Promise<string> {
  const path = '/tmp/.gopath'
  process.env.GOPATH = path
  process.env.GOBIN = `${path}/bin`

  await io.mkdirP(`${path}/src`)
  await io.mkdirP(`${path}/bin`)
  execSync(
    `export GOPATH=${path} GOBIN=${path}/bin && ` +
      'GO111MODULE=on go get -u github.com/mchirico/sshClientK8s'
  )

  return process.env.GOPATH
}
