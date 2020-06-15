import * as toolCache from '@actions/tool-cache'
import {retry} from '@lifeomic/attempt'

export async function downloadAndReturnPath(url: string): Promise<string> {
  const downloadPath = await retry(async () => toolCache.downloadTool(url), {
    delay: 200,
    factor: 2,
    maxAttempts: 4
  })

  return downloadPath
}
