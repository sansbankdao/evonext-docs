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
                EvoNext is the first truly permissionless social platform where your identity and content are permanently yours on the Dash Platform.
            </>
        ),
    },
    {
        title: 'Uncensorable',
        Svg: require('@site/static/img/uncensored.svg').default,
        description: (
            <>
                Built on decentralized technology, it's technically impossible for your content or identity to be censored or removed by any centralized entity.
            </>
        ),
    },
    {
        title: 'EvoApps',
        Svg: require('@site/static/img/mini-apps.svg').default,
        description: (
            <>
                Experience powerful mini-applications within EvoNext that extend functionality while maintaining the principles of decentralization and user ownership.
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
                <button className="button button--primary button--sm">
                    Learn More
                </button>
            </div>
        </div>
    )
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    <div className="col col--12 text--center padding-bottom--lg">
                        <Heading as="h2">
                            Why Choose EvoNext?
                        </Heading>
                        <p className="text--center padding-horiz--md">
                            Experience a new paradigm in social networking where you own your digital identity, control your content, and participate in a truly decentralized ecosystem.
                        </p>
                    </div>
                </div>
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    )
}
