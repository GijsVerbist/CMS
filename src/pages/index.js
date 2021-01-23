import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp} from './pageStyles/pageStyles'
import {COLORS} from '../constants'
const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
          homePageDescription,
          homePageFeaturedFilms,
          homePageTitle,
          homePageBannerFoto,
        }
      }
    }
  } = useStaticQuery(graphql`
  query{
   wpcontent {
    page(id: "home", idType: URI) {
      homePageMeta {
        homePageDescription
        homePageFeaturedFilms {
          ... on WPGraphql_Film {
            id
            slug
            filmsMeta {
              director
              fieldGroupName
              name
              year
              image {
                altText
                sourceUrl
                imageFile{
                  childImageSharp{
                    fluid(quality:100, grayscale: true){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              } 
            }
          }
        }
        homePageTitle
        homePageBannerFoto {
          altText
          sourceUrl
          imageFile{
            childImageSharp{
              fluid(quality:100){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
}
`)
console.log(homePageFeaturedFilms)
  return (
  <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image 
        fluid={homePageBannerFoto.imageFile.childImageSharp.fluid}
        alt={homePageBannerFoto.altText}/>
        <div className="inner-div">
          <p className="header-title">{homePageTitle}</p>
          <p className="header-description">{homePageDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}></BottomEdgeDown> 
      </div>
      <div className = "description">
        <p>{homePageDescription}</p>
       <BottomEdgeUp color={COLORS.PRIMARY}></BottomEdgeUp> 
      </div>
      <div className="films">
        <h2>Featured Films</h2>
        <div className="film-items">
        {homePageFeaturedFilms.map(({filmsMeta, slug})=>(
          <Artist to={`/${slug}`}>
            <Image fluid={filmsMeta.image.imageFile.childImageSharp.fluid} alt={filmsMeta.image.altText}></Image>
            <div className="film-info">
            <p>{filmsMeta.name}</p>
            </div>
            
          </Artist>
        ))}
        </div>  
      </div>
    </Wrapper>
  </Layout>)
}

export default IndexPage
