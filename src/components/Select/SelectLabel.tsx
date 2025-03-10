import { forwardRef } from 'react'
import {
  Box,
  CloseButton,
  MultiSelectValueProps,
  SelectItemProps,
} from '@mantine/core'
import { IconUser, IconUserPlus } from '@tabler/icons'

export function Value({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  //const Flag : string = flags[value];
  return (
    <div {...others}>
      <Box
        sx={theme => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box mt={4} mr={5}>
          <IconUser color={'lightgray'} />
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  )
}

export const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, value, ...others }, ref) => {
    //const Flag = flags[value];
    return (
      <div ref={ref} {...others}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box mr={10}>
            <IconUserPlus color={'lightgray'} />
          </Box>
          <div>{label}</div>
        </Box>
      </div>
    )
  }
)
