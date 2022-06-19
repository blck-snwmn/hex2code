import { useReducer, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  NumberInput,
  NumberInputField,
  Textarea,
  useColorMode,
} from '@chakra-ui/react';

type Action = { language: 'Go'; input: string; word: number };

const mapper = {};

const reducer = (_: string, action: Action) => {
  const input = action.input;
  const split = input.split(' ');
  const filltered = split.filter((s) => s.length == 2 && s.match(/[0-9a-fA-F]{2}/g));
  filltered.forEach(s => console.log(s, s.match(/[0-9a-fA-F]{2}/g)))
  const mapped = filltered.map((i) => '0x' + i + ','); // to hex format

  const format = mapped.reduce((acc, x) => { // fix the length of one line
    const last = acc.length - 1;
    acc[last].push(x);
    if (acc[last].length == action.word) {
      acc.push([]); // new line
    }
    return acc;
  }, [[]] as [string[]]);
  const joined = format.map((i) => i.join(' ')).join('\n');
  return joined;
};

function App() {
  const [value, setValue] = useState('');
  const [wordNum, setWordNum] = useState('8');
  const [state, dispatch] = useReducer(reducer, '');
  return (
    <Container maxW='150rem'>
      <Grid
        templateAreas={`"header header"
                        "left right"`}
        gridTemplateColumns={'1fr 1fr'}
        gridTemplateRows={'1fr'}
        gap={6}
      >
        <GridItem area={'header'}>
          <HStack spacing='24px'>
            <FormLabel htmlFor='wordPerLint'>1行の文字数</FormLabel>
            <NumberInput name='wordPerLint' value={wordNum}>
              <NumberInputField
                onChange={(e) => {
                  setWordNum(e.target.value);
                }}
              />
            </NumberInput>
            <Button
              onClick={() => {
                const w = Number(wordNum);
                dispatch({ language: 'Go', input: value, word: w ? w : 8 });
              }}
            >
              Change
            </Button>
          </HStack>
        </GridItem>
        <GridItem area={'left'}>
          <Box>
            <FormLabel htmlFor='hexinput'>Input:</FormLabel>
            <Textarea
              rows={20}
              cols={100}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              name='hexinput'
            >
            </Textarea>
          </Box>
        </GridItem>
        <GridItem area={'right'}>
          <Box>
            <FormLabel htmlFor='hexresult'>Result:</FormLabel>
            <Textarea rows={20} cols={200} value={state} name='hexresult'></Textarea>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
