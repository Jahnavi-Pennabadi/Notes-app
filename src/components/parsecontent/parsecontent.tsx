import ReactPlayer from 'react-player';

export const parseContent = (content: string) => {
  const elements: JSX.Element[] = [];


  const contentWithEmbed = content.replace(
    /<oembed url="([^"]+)"><\/oembed>/g,
    (url) => {
      elements.push(
        <ReactPlayer
          key={url}
          url={url}
          width="100%"
          height="115px"
          controls={true}
        />
      );
      return ''; 
    }
  );

  
  const contentWithImages = contentWithEmbed.replace(
    /<img src="([^"]+)" alt="([^"]+)" \/>/g,
    (match, src, alt) => {
      return `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`;
    }
  );

  const contentWithClassNames = contentWithImages.replace(/class=/g, 'className=');

  const contentWithTables = contentWithClassNames
    .replace(/<table>/g, `<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">`)
    .replace(/<tr>/g, `<tr style="border: 1px solid #ddd;">`)
    .replace(/<td>/g, `<td style="padding: 8px; text-align: left; border: 1px solid #ddd;">`);

  elements.push(
    <div
      key="parsed-html"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  return elements;
};
