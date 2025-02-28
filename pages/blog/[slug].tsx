import { FC } from 'react'
import { GetStaticPropsContext } from 'next'
import { Frontmatter } from '../../types/blog'
import { MDXProvider } from '@mdx-js/react'
import { styled } from '@styles'
import { Pre } from '../../components/Pre'
import { Link } from '../../components/Link'
import Head from 'next/head'

import * as ImageOptimization from '@blog/image-optimizations.mdx'
import * as PerfectLoader from '@blog/perfect-loader.mdx'
import * as MLOnClient from '@blog/state-of-ml-on-the-frontend.mdx'
import * as BestSecondLanguage from '@blog/perfect-loader.mdx'
import * as MLOnClient2 from '@blog/state-of-ml-on-the-frontend-2.mdx'
import * as FpComposition from '@blog/fp-composition-1.mdx'
import * as GraphQLTooling1 from '@blog/graphql-tooling-1.mdx'
import * as GraphQLTooling2 from '@blog/graphql-tooling-2.mdx'
import * as GraphQLTooling3 from '@blog/graphql-tooling-3.mdx'
import * as GraphQLTooling4 from '@blog/graphql-tooling-4.mdx'
import * as GraphQLTooling5 from '@blog/graphql-tooling-5.mdx'
import * as GraphQLTooling6 from '@blog/graphql-tooling-6.mdx'
import * as WasmInGeneral from '@blog/wasm-in-general.mdx'
import * as ExternalHowToWriteTests from '@blog/how-to-write-test-with-jest.mdx'
import * as ExternalTrivialMemoryModel from '@blog/trivial-memory-model.mdx'
import * as Threads from '@blog/threads.mdx'

const pages = [
  ImageOptimization,
  PerfectLoader,
  MLOnClient,
  MLOnClient2,
  BestSecondLanguage,
  FpComposition,
  GraphQLTooling1,
  GraphQLTooling2,
  GraphQLTooling3,
  GraphQLTooling4,
  GraphQLTooling5,
  GraphQLTooling6,
  WasmInGeneral,
  ExternalHowToWriteTests,
  Threads,
  ExternalTrivialMemoryModel
]

const Img = styled('img', {
  maxWidth: '$max',
})

type Props = {
  frontmatter: Frontmatter
  Component: React.FunctionComponent
  slug: string
}

const Details: FC = ({ children }) => <details>{children}</details>
const Header2: FC = ({ children }) => <h2 id={String(children)}>{children}</h2>

const components = {
  img: (props: { src: string; alt: string }) => {
    return <Img src={props.src} alt={props.alt} />
  },
  details: Details,
  pre: Pre,
  a: Link,
  h2: Header2,
}

export function getStaticPaths() {
  // @ts-ignore
  const paths = (__POSTS__ as Post[]).filter(p => p.frontmatter.external !== true).
  map(p => ({
    params: {
      slug: `${p.frontmatter.slug}`,
      locale: 'ru',
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export function getStaticProps(context: GetStaticPropsContext) {
  const currentSlug = context?.params?.slug || ''
  const post =
    // @ts-ignore
    __POSTS__.find(f => currentSlug.includes(f.frontmatter.slug))
  return {
    props: {
      frontmatter: post?.frontmatter || {},
      slug: currentSlug,
    },
  }
}

const DateComponent = styled('div', {
  fontSize: '$small',
  position: 'absolute',
})

const Post: FC<Props> = ({ frontmatter, slug }) => {
  const CurrentPage = pages.find(
    // @ts-ignore
    p => p?.frontmatter?.slug === slug
  )?.default

  return (
    <>
      <Head>
        {!!frontmatter && (
          <>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@pgurtovaya" />
            <meta name="twitter:title" content={frontmatter.title} />
            <meta
              name="twitter:description"
              content={frontmatter?.description || frontmatter.title}
            />
            <meta name="twitter:image" content={frontmatter.image} />
          </>
        )}
      </Head>
      {/* @ts-ignore */}
      <MDXProvider components={components}>
        <DateComponent>
          {new Date(frontmatter?.date).toLocaleDateString('en-US')}
        </DateComponent>
        <h1>{frontmatter?.title}</h1>
        <div>
          {/* @ts-ignore */}
          {CurrentPage ? <CurrentPage /> : null}
        </div>
      </MDXProvider>
    </>
  )
}

export default Post
