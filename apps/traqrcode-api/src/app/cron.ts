import { log } from './utils'

// @ts-ignore
import { CronJob } from 'cron'
import { getDate } from '../../common/src/utils/dates'
import { getReqPathsWithinRange, removeSync } from './core'

export const deleteOldReqs = () => {
  log('Run cronjob deleteOldReqs')
  // run at midnight
  const job = new CronJob(
    '0 0 * * * *',
    function () {
      const fileToBeDeleted = getReqPathsWithinRange(
        '0000-01-01',
        getDate().add(-1, 'years'),
      )

      for (const f of fileToBeDeleted) {
        log('deleting ', f)
        removeSync(f)
      }
    },
    null,
    true,
    'UTC',
  )
  job.start()
}
