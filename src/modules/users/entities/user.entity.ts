import { BaseModel } from 'src/common/abstracts/base-model'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends BaseModel {
    @Column()
    firstName: string

    @Column()
    lastName: string

    // @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
    // comments: Comment[]
}

// @Entity()
// export class Comment extends BaseModel {
//     @Column()
//     content: string

//     @ManyToOne(() => User, (user) => user.comments)
//     user: User
// }
