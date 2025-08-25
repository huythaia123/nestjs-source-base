import { BaseModel } from 'src/common/abstracts/base-model'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends BaseModel {
    @Column()
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

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
