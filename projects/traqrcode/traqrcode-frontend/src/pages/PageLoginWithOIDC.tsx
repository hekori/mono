import * as React from 'react'
import {ShellPublic} from '../components/ShellPublic'
import {Container} from '../components/Container'
import {useHistory} from 'react-router-dom'
import {TERMS_ROUTE} from '../routing/routingPaths'
import {CheckLoginRouteInfo} from '../routing/routingTypes'
import {getBackendLoginGoogleUrl} from "@hekori/traqrcode-common";
import {ButtonSecondarySmall, ExternalLink, TextSmall} from "@hekori/uikit";
import {InternalLink} from "../../../../../libs/uikit/src/lib/buttons/InternalLink";

interface PropsPageCheckLogin {
    routeInfo: CheckLoginRouteInfo
}

export const PageLoginWithOIDC: React.FC = () => {
    const history = useHistory()

    return (
        <ShellPublic>
            <Container>
                <ButtonSecondarySmall onClick={() => {
                    window.location.href = getBackendLoginGoogleUrl(true)
                }}
                className={`w-1/3`}
                >
                    <svg width="20" height="20" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg"
                         preserveAspectRatio="xMidYMid">
                        <path
                            d="M255.878 133.451c0-4.812-.186-9.624-.56-14.388H130.55v27.193h71.947c-2.951 15.04-11.52 27.756-22.78 34.24v28.527h36.823c21.605-19.923 34.338-49.248 34.338-75.572"
                            fill="#4285F4"/>
                        <path
                            d="M130.55 261.1c33.824 0 62.165-11.14 82.843-30.18l-36.823-28.528c-11.283 7.583-25.701 12.06-46.02 12.06-35.308 0-65.166-23.824-75.878-59.09H18.28v28.527C46.915 226.17 85.03 261.1 130.55 261.1"
                            fill="#34A853"/>
                        <path
                            d="M54.673 156.373c-2.88-8.49-4.51-17.59-4.51-26.872s1.63-18.38 4.51-26.872V74.102H18.28C6.51 91.74 0 112.16 0 133.5s6.51 41.76 18.28 59.398l36.393-28.525"
                            fill="#FBBC05"/>
                        <path
                            d="M130.55 52.957c22.488 0 42.313 7.44 56.465 22.18l42.016-42.016C205.956 6.437 171.295 0 130.55 0 85.03 0 46.915 34.929 18.28 74.102l36.393 28.525c10.712-35.265 40.57-59.09 75.878-59.09"
                            fill="#EB4335"/>
                    </svg>
                    <span className="ml-4">Login with Google</span>
                </ButtonSecondarySmall>

                <br/>

                <ButtonSecondarySmall onClick={() => {
                    window.location.href = getBackendLoginGoogleUrl(true)
                }}
                className={`w-1/3`}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.9981 12C23.9981 5.37258 18.6255 0 11.9991 0C5.3727 0 0 5.37258 0 12C0 17.9883 4.38794 22.9524 10.1246 23.8524V15.467H7.07764V12H10.1246V9.3565C10.1246 6.34825 11.9157 4.5 14.6564 4.5C15.9691 4.5 17.3423 4.7305 17.3423 4.7305V7.5H15.8292C14.3387 7.5 13.8731 8.312 13.8731 9.024V12H17.2016L16.6691 15.467H13.8731V23.8524C19.6098 22.9524 23.9981 17.9883 23.9981 12H23.9981Z"
                            fill="white"/>
                    </svg>
                    <span className="ml-4">Login with Facebook</span>
                </ButtonSecondarySmall>

                <br/>

                <ButtonSecondarySmall onClick={() => {
                    window.location.href = getBackendLoginGoogleUrl(true)
                }}
                 className={`w-1/3`}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 12.9999L12.9999 21L5 13.0001L13.0001 5L21 12.9999ZM12.9999 19.5898L18.5898 13.9999L13.0001 8.41015L7.41015 13.9999L12.9999 19.5898ZM4.58984 13.9999L10.1797 19.5898L5.58984 24.1797L0 19.5898L4.58984 13.9999ZM19.5898 13.9999L24.1797 19.5898L19.5898 24.1797L13.9999 19.5898L19.5898 13.9999ZM13.0001 4.41015L18.5898 10L13.0001 15.5898L7.41015 10L13.0001 4.41015ZM5.58984 0L10.1797 5.58984L4.58984 10.1797L0 5.58984L5.58984 0ZM19.5898 0L24.1797 5.58984L19.5898 10.1797L13.9999 5.58984L19.5898 0ZM5.58984 24.1797L10.1797 18.5898L4.58984 13.0001L0 18.5898L5.58984 24.1797Z"
                            fill="white"/>
                    </svg>
                    <span className="ml-4">Login with Microsoft</span>
                </ButtonSecondarySmall>


                <div className="text-left text-onDocument3 mt-4">
                    <TextSmall>
                        By logging in you accept the{' '}
                        <InternalLink aria-label="terms & conditions" href={TERMS_ROUTE}>
                            terms and conditions
                        </InternalLink>
                        .
                    </TextSmall>
                </div>
            </Container>
        </ShellPublic>
    )
}
