import { Circle } from "./circle";
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";
describe('Тестирование Circle', () => {
    it('без буквы', () => {
        const tree = renderer
            .create(<Circle letter='' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с буквами (Snapshot)', () => {
        const tree = renderer
            .create(<Circle letter='A' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с head (Snapshot)', () => {
        const tree = renderer
            .create(<Circle head={'1'} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с react-элементом в head', () => {
        const tree = renderer
            .create(<Circle head={<Circle letter='A' />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с tail;', () => {
        const tree = renderer
            .create(<Circle tail={'T'} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });



    it('с react-элементом в tail', () => {
        const tree = renderer
            .create(<Circle tail={<Circle letter='A' />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с index', () => {
        const tree = renderer
            .create(<Circle index={1} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('с пропом isSmall ===  true', () => {
        const tree = renderer
            .create(<Circle isSmall tail={<Circle letter='A' />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('в состоянии default', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('в состоянии default', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('в состоянии default', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});