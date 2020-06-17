import * as core from '@actions/core'
import {wait} from './wait'
import {footlooseSetup} from './footloose'
import {sshClientK8sSetup} from './sshClientK8s'
import {execSync} from 'child_process'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))

    core.setOutput('time', new Date().toTimeString())

    await footlooseSetup()
    execSync('/tmp/footloose create --config /tmp/footloose.yaml')

    await sshClientK8sSetup()

    const cmd: string = core.getInput('cmd')
    execSync(cmd)
    core.setOutput('cmd executed', cmd)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
