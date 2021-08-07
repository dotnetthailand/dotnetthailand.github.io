import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { useId } from '@fluentui/react-hooks';
import { IAuthorInfo } from './PageMetadata';
import { isMobile } from '../../styles/responsive';
interface IPersonProps {
  author: IAuthorInfo;
  margin: number;
}

const Person = ({ author, margin }: IPersonProps) => {
  const tooltipId = useId(author.username);
  const calloutProps = { gapSpace: 0 };
  const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

  return (
    <a key={author.username} href={author.profileUrl} target="_blank" rel="noreferrer">
      <TooltipHost
        content={author.name}
        id={tooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
      >
        <Persona
          styles={{
            root: { margin }
          }}
          imageUrl={author.avatarUrl}
          text={author.name}
          size={isMobile() ? PersonaSize.size32 : PersonaSize.size40}
          hidePersonaDetails={true}
          imageAlt={author.name}
        />
      </TooltipHost>
    </a>
  )
}

export default Person;
