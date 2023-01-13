import React from "react";
import { Page } from "../components/index";
import { graphql } from "gatsby";
import "./Bibliografia.scss";
import { PortableText } from "@portabletext/react";
import Pdf from "../components/Pdf/Pdf";
import SanityImage from "gatsby-plugin-sanity-image";

const Bibliografia = ({ data }) => {
  const { title, imageHeader } = data?.allSanityBibliografia?.nodes[0];
  const bibliografia = data?.allSanityComponentbibliografia?.nodes;

  bibliografia.sort(function (a, b) {
    if (a.author.toLowerCase() > b.author.toLowerCase()) {
      return 1;
    }
    if (a.author.toLowerCase() < b.author.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  return (
    <>
      <Page>
        {
          <section className='bibliografia'>
            <div className='bibliografiaHeader'>
              <div className='empty-left'></div>
              <div className='mb-5'>
              {imageHeader && (
                <SanityImage
                  {...imageHeader}
                  alt='Image Art'
                  className='imageHeader'
                />
              )}
              <div className='titleContent mb-4'>
                <div></div>
                {title && (
                  <>
                    <h5 className='title'>{title}</h5>
                    <div className='vacio'></div>
                  </>
                )}
                <div></div>
              </div>
              </div>
              <div className='empty-right'></div>
            </div>

            {bibliografia.map((item, index) => (
              <div className='contentBibliografia' key={index}>
                <div className='empty-left'></div>
                <div className='textBibliografia'>
                  <div></div>
                  <div>
                    <h5 className='title'>{item.title}</h5>
                    <p> Por {item.author}</p>
                    <PortableText value={item._rawRichTextBody} />
                    <Pdf data={item?.referenceBibliografia} />
                    <div className='line'></div>
                  </div>

                  <div></div>
                </div>
                <div className='empty-right'></div>
              </div>
            ))}
          </section>
        }
      </Page>
    </>
  );
};

export default Bibliografia;

export const query = graphql`
  query($slug: String!) {
    allSanityBibliografia(filter: { tipoBibliografia: { eq: $slug } }) {
      nodes {
        title
        tipoBibliografia
        imageHeader {
          asset {
            _id
          }
          crop {
            _key
            _type
            bottom
            left
            right
            top
          }
          hotspot {
            _key
            _type
            height
            width
            x
            y
          }
        }
      }
    }

    allSanityComponentbibliografia( filter: { filtroBilbliografia: { in: [$slug, "ambos"] }}) {
      nodes {
        author
        title
        _rawRichTextBody
        filtroBilbliografia
        referenceBibliografia {
          link
          tipoPdf
        }
      }
    }
  }
`;