import {
    ButtonFlat,
    Card,
    Input,
    NoShell,
    Select,
    Typography,
} from '@hekori/uikit'
import React from 'react'

export const CreateNewFeedback: React.FC = () => {
    return (
        <NoShell>
            <Card>
                <Typography type="h1">Form With Floating Labels</Typography>
                <form id="form" noValidate>
                    <div className="relative z-0 w-full mb-5">
                        <Input
                            placeholder={'Enter name'}
                            label={'some label'}
                        />
                        <Input type="email" placeholder={'Enter email'} />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                        />
                        <Select
                            options={[
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                            ]}
                        />
                    </div>

                    <ButtonFlat text={'Submit'} />
                </form>
            </Card>
        </NoShell>
    )
}
