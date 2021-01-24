import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/filmStyles'

const FilmTemplate = ({ data: {wpcontent: {film: {filmsMeta, roles:{edges: roles}}}}}) =>{
    return(
<Layout>
   <SEO title="Film"></SEO> 
   <Wrapper>
       <div className="film-container">
           <div className="film-image">
           <Image fluid={filmsMeta.image.imageFile.childImageSharp.fluid}/>
            <div className="roles">
                {roles.map(({node: role})=>(
                    <div key={role.name} className="role">{role.name} </div>
                ))}
            </div>
           </div>
           <div className="film-info">
               <h2>{filmsMeta.name}</h2>
               <h3>{filmsMeta.director}</h3>
               <p className="description">{filmsMeta.description}</p>
               <p className="info">year of making: {filmsMeta.year}</p>
           </div>
       </div>   
   </Wrapper>
</Layout>

    )
    
}

export default FilmTemplate

export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
      film(id: $id, idType: ID) {
        roles {
          edges {
            node {
              name
            }
          }
        }
        filmsMeta {
          director
          description
          name
          year
          image {
            sourceUrl
            imageFile{
              childImageSharp{
                fluid(quality:100, grayscale: true){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
        }
      }
    }
  }
  
`