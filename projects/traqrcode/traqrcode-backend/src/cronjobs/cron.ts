import { log } from '../utils/utils'

import { CronJob } from 'cron'

export const dummy = () => {
  log('Run cronjob deleteOldReqs')
  // run at midnight
  const job = new CronJob(
    '0 0 * * * *',
    function () {
      // Implement cronjob here
    },
    null,
    true,
    'UTC'
  )
  job.start()
}
