// src/components/HomepageFeatures/index.js

import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
    {
        title: 'Permissionless',
        Svg: require('@site/static/img/permissionless.svg').default,
        description: (
            <>
                EvoNext is the 1ST social media platform with ZERO centralized entities that you MUST adhere to.
            </>
        ),
    },
    {
        title: 'Uncensored',
        Svg: require('@site/static/img/uncensored.svg').default,
        description: (
            <>
                It's technically impossible for ANY community members to be censored, in any way, by the Dash Evolution Platform powering the platform.
            </>
        ),
    },
    {
        title: 'Mini Apps',
        Svg: require('@site/static/img/mini-apps.svg').default,
        description: (
            <>
                Evo Apps are introducing the 1st uncensorable content platform.
                Extend or customize your website layout by reusing React. Docusaurus can
                be extended while reusing the same header and footer.
            </>
        ),
    },
]

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>

            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    )
}
