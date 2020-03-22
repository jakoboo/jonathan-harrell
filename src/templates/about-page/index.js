import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Padded from '../../jh-ui/Padded'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import SectionHeader from '../../jh-ui/SectionHeader'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'
import website from '../../../website-config'
import {
  AboutContentWrap,
  BioFigure,
  BioImage,
  BioText,
  HeaderContentWrap,
  HeaderWrap,
  Involvement,
  InvolvementDescription,
  InvolvementTitle,
  InvolvementWrap,
  Usage,
  UsageLink,
  UsesWrap
} from './styles'

export const AboutPageTemplate = ({ location, title, image, bio, involvement, whatIUse }) => (
  <>
    <Seo
      title={`${title} | ${website.titleAlt}`}
      pathname={location.pathname}
      description="Jonathan Harrell is a UI/UX designer and front-end developer. He specializes in and blogs about HTML and CSS. Learn more."
      banner={image.publicURL}
    />
    <HeaderWrap aria-labelledby="about-label">
      <AboutContentWrap>
        <HeaderContentWrap>
          {image && (
            <BioFigure>
              <BioImage src={image.publicURL} alt="Jonathan Harrell"/>
            </BioFigure>
          )}
          <BioText>
            <Heading level={1} id="about-label">
              {title || 'About Jonathan'}
            </Heading>
            <Spaced top="m">
              <Text>
                {bio}
              </Text>
            </Spaced>
          </BioText>
        </HeaderContentWrap>
      </AboutContentWrap>
    </HeaderWrap>
    <InvolvementWrap aria-labelledby="involvement-label">
      <AboutContentWrap>
        <SectionHeader>
          <Heading level={4} as="h2" id="involvement-label">
            {involvement.title || 'Involvement'}
          </Heading>
        </SectionHeader>
        <Padded vertical="l">
          {involvement.project.map((project, index) => (
            <Involvement key={index}>
              <InvolvementTitle>
                <Spaced bottom="s">
                  <Heading level={3}>
                    {project.name}
                  </Heading>
                </Spaced>
              </InvolvementTitle>
              <InvolvementDescription>
                {project.description}
              </InvolvementDescription>
            </Involvement>
          ))}
        </Padded>
      </AboutContentWrap>
    </InvolvementWrap>
    <UsesWrap id="uses" aria-labelledby="uses-label">
      <AboutContentWrap>
        <SectionHeader>
          <Heading level={4} as="h2" id="uses-label">
            {whatIUse.title || 'What I Use'}
          </Heading>
        </SectionHeader>
        <dl>
          <Padded vertical="m">
            {whatIUse.usage.map((usage, index) => (
              <Usage key={index}>
                <dt><Text>{usage.name}</Text></dt>
                <dd><UsageLink href={usage.link}>{usage.description}</UsageLink></dd>
              </Usage>
            ))}
          </Padded>
        </dl>
      </AboutContentWrap>
    </UsesWrap>
  </>
)

AboutPageTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    publicURL: PropTypes.string.isRequired
  }).isRequired,
  bio: PropTypes.string.isRequired,
  involvement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    project: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  whatIUse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    usage: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

const AboutPage = ({ location, data: { mdx: post } }) => {
  const { title, bioimage, bio, involvement, what_i_use: whatIUse } = post.frontmatter

  return (
    <Layout>
      <AboutPageTemplate
        location={location}
        title={title}
        image={bioimage}
        bio={bio}
        involvement={involvement}
        whatIUse={whatIUse}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        bioimage: PropTypes.shape({
          publicURL: PropTypes.string.isRequired
        }).isRequired,
        bio: PropTypes.string.isRequired,
        involvement: PropTypes.shape({
          title: PropTypes.string.isRequired,
          project: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
          })).isRequired
        }).isRequired,
        what_i_use: PropTypes.shape({
          title: PropTypes.string.isRequired,
          usage: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
          })).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage {
    mdx(frontmatter: {templateKey: {eq: "about-page"}}) {
      frontmatter {
        title
        bioimage {
          publicURL
        }
        bio
        involvement {
          title
          project {
            name
            description
          }
        }
        what_i_use {
          title
          usage {
            name
            description
            link
          }
        }
      }
    }
  }
`