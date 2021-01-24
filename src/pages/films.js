import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp, Film } from '../components/pageStyles/pageStyles'
import {COLORS} from '../constants'



const FilmsPage = () => {
    const {
        wpcontent:{
            page:{
                filmsPageMeta:{
                    filmsPageDescription,
                    filmsPageBannerFoto,
                }
                
            },
            films: {edges: films}
        }
    } = useStaticQuery(graphql`
    query {
        wpcontent {
          page(id: "Films", idType: URI) {
            filmsPageMeta {
              fieldGroupName
              filmsPageDescription
              filmsPageBannerFoto {
                altText
                sourceUrl
                imageFile{
                  childImageSharp{
                    fluid(quality:75){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
          films {
            edges {
              node {
                filmsMeta {
                  director
                  name
                  year
                  image {
                    altText
                    sourceUrl
                    imageFile{
                      childImageSharp{
                        fluid(quality:75, grayscale: true){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  } 
                }
                slug
              }
            }
          }
        }
      }
      
    `)
    return (
    <Layout>
        <SEO title="Films"></SEO>
        <Wrapper artistColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
           <Image fluid={filmsPageBannerFoto.imageFile.childImageSharp.fluid}></Image> 
            <BottomEdgeDown color={COLORS.SECONDARY}/>
        </div>
        <div className="description">
            <h2>This is the Verbist Showroom</h2>
            <p>{filmsPageDescription}</p>
            <BottomEdgeUp color={COLORS.BLACK}></BottomEdgeUp>
        </div>

        <div className="films">
            <h2>The films</h2>
            <div className="film-items">
            {films.map(({node:{filmsMeta, slug}})=>(
                <Film to={`/${slug}`} key={slug}>
                    <Image fluid={filmsMeta.image.imageFile.childImageSharp.fluid} alt={filmsMeta.image.altText}></Image>
                    <div className="film-info">
                        <p>{filmsMeta.name}</p>
                    </div>
                </Film>
            ))}

            </div>
        </div>
        </Wrapper>
    </Layout>
        
    )
}

export default FilmsPage