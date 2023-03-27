import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Spoiler,
  Text,
} from '@mantine/core';
import { IconArrowRight, IconHeartFilled } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import useStyles from './LibraryElementList.styles';

interface ContainerProps {
  elements: Array<{
    id: string;
    name: string;
    tags: Array<{ name: string }>;
    markdown: string;
    languageCode: string;
    sourceUrl: string;
    sourceName: string;
    sourceBaseUrl: string;
    licenseName: string;
    licenseUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export const LibraryElementList: React.FC<ContainerProps> = ({ elements }) => {
  const { classes } = useStyles();
  return (
    <Grid>
      {elements.map((element) => (
        <Grid.Col sm={12} md={6} lg={4}>
          <Card shadow="sm" padding="sm" my="sm">
            <Text weight={700}>{element.name}</Text>
            <Group spacing="xs" mt="xs">
              {element.tags.map(({ name }) => (
                <Badge color="pink" variant="light">
                  {name}
                </Badge>
              ))}
            </Group>
            <Divider my="xs" />
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
              <ReactMarkdown>{element.markdown}</ReactMarkdown>
            </Spoiler>
            <Card.Section>
              <Divider my="xs" />
            </Card.Section>
            <Group>
              <Button style={{ flex: 1 }} leftIcon={<IconArrowRight />}>
                Open
              </Button>
              <ActionIcon variant="default" size={36}>
                <IconHeartFilled size="1.1rem" className={classes.like} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
