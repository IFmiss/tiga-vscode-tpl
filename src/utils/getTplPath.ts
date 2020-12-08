import * as path from 'path';

export default function getTplPath(tplType: TemplateType) {
  try {
    return path.resolve(__dirname, `./../template/${tplType}`);
  } catch (e) {
    console.info('e', e);
    return e;
  }
}
