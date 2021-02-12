import React from 'react';
import { mount } from 'enzyme';
import { JsonExplain } from './JsonExplain';
import { useExplains } from '../../Explain.hooks';
import { dataQa } from '@percona/platform-core';

jest.mock('../../Explain.hooks');
jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');
jest.mock('antd/es/tooltip', () => <div className="tooltip" />);

describe('JsonExplain::', () => {
  it('should render explains correct for loading state', function() {
    useExplains.mockImplementationOnce(() => {
      return [
        {
          error: '',
          loading: true,
          value: null,
        },
      ];
    });
    const root = mount(<JsonExplain databaseType={'mysql'} examples={[]} />);

    expect(root.find(dataQa('json-explain-error')).length).toBe(0);
    expect(root.find(dataQa('json-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', function() {
    useExplains.mockImplementationOnce(() => {
      return [
        {
          error: 'some error',
          loading: false,
          value: null,
        },
      ];
    });
    const root = mount(<JsonExplain databaseType={'mysql'} examples={[]} />);

    expect(root.find(dataQa('json-explain-error')).length).toBe(1);
    expect(root.find(dataQa('json-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', function() {
    useExplains.mockImplementationOnce(() => {
      return [
        {
          error: '',
          loading: false,
          value: JSON.stringify({ data: 'test' }),
        },
      ];
    });
    const root = mount(<JsonExplain databaseType={'mysql'} examples={[]} />);

    expect(root.find(dataQa('json-explain-error')).length).toBe(0);
    expect(root.find(dataQa('json-explain-no-data')).length).toBe(0);
  });
});
